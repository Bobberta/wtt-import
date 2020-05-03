import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Player from "react-audio-player";
import { RootState } from "../store/reducers";
import {
  Button,
  Table,
  Divider,
  Tag,
  Typography,
  Avatar,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteFilled,
  CheckOutlined,
  CaretRightFilled,
  PauseOutlined,
} from "@ant-design/icons";

import { Track } from "../types/types";
import { deleteTrack, editTrack, setCurrentStep } from "../store/actions";

const { Text, Title } = Typography;
const { Column } = Table;

const ValidationStep = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const tracks = useSelector((state: RootState) => state.tracks);
  const [editingId, setEditingId] = useState("");
  const [previewUrl, play] = useState<string | null | undefined>();

  const isEditing = (record: Track) => record.id === editingId;

  const edit = (record: Track) => {
    setEditingId(record.id);
    form.setFieldsValue({
      title: "",
      artist: "",
      year: "",
      ...record,
    });
  };

  const saveEdits = async (track: Track) => {
    try {
      const edits = await form.validateFields();
      const newTrack = { ...track, ...edits };
      dispatch(editTrack(newTrack));
      setEditingId("");
    } catch (error) {
      const errorMessage = error.errorFields.map((item: any) => item.errors[0]);
      message.error(errorMessage);
    }
  };

  const cancel = () => {
    setEditingId("");
  };

  const handleValidateImport = () => {
    dispatch(setCurrentStep(3));
  };

  return (
    <>
      <Player src={previewUrl ? previewUrl : ""} autoPlay controls />
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={handleValidateImport}
      >
        Valider l'import
      </Button>
      <Form form={form} component={false}>
        <Table
          title={() => (
            <Title level={4}>{tracks.length} morceaux sélectionnés</Title>
          )}
          dataSource={tracks}
        >
          <Column
            dataIndex="coverImage"
            key="cover"
            render={(image, record: Track) => (
              <>
                <Avatar shape="square" src={image} />
                <Divider type="vertical" />
                {previewUrl !== record.audio ? (
                  <Button
                    shape="circle"
                    onClick={() => {
                      play(record.audio);
                    }}
                    icon={<CaretRightFilled />}
                  />
                ) : (
                  <Button
                    shape="circle"
                    onClick={() => {
                      play("");
                    }}
                    icon={<PauseOutlined />}
                  />
                )}
              </>
            )}
          />
          <Column
            title="Titre"
            dataIndex="title"
            key="title"
            render={(title, record: Track) =>
              isEditing(record) ? (
                <Form.Item
                  noStyle
                  name="title"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Merci de renseigner un titre",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                <Text ellipsis>{title}</Text>
              )
            }
          />
          <Column
            title="Artiste(s)"
            dataIndex="artist"
            key="artist"
            render={(artist, record: Track) =>
              isEditing(record) ? (
                <Form.Item
                  noStyle
                  name="artist"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Merci de renseigner un artiste",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                <Text ellipsis>{artist}</Text>
              )
            }
          />
          <Column
            title="Année"
            dataIndex="year"
            key="year"
            sorter={(a: any, b: any) => a.year - b.year}
            render={(year, record: Track) =>
              isEditing(record) ? (
                <Form.Item
                  noStyle
                  name="year"
                  rules={[{ required: true, message: "Année manquante" }]}
                >
                  <InputNumber />
                </Form.Item>
              ) : (
                <Text ellipsis>{year}</Text>
              )
            }
          />
          <Column
            title="Source"
            dataIndex="provider"
            key="provider"
            render={(provider: "deezer" | "spotify") => (
              <Tag color={provider === "spotify" ? "green" : "geekblue"}>
                {provider.toUpperCase()}
              </Tag>
            )}
          />
          <Column
            title="Actions"
            dataIndex="actions"
            render={(text: string, record: Track) =>
              isEditing(record) ? (
                <>
                  {" "}
                  <Button onClick={cancel}>Annuler</Button>
                  <Divider type="vertical" />
                  <Button
                    icon={<CheckOutlined />}
                    type="primary"
                    onClick={() => saveEdits(record)}
                  />
                </>
              ) : (
                <>
                  <Button onClick={() => edit(record)}>Modifier</Button>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Supprimer le morceau ?"
                    onConfirm={() => dispatch(deleteTrack(record.id))}
                    okText="Oui"
                    cancelText="Annuler"
                    okType="danger"
                  >
                    <Button icon={<DeleteFilled />} />
                  </Popconfirm>
                </>
              )
            }
          />
        </Table>
      </Form>
    </>
  );
};

export default ValidationStep;
