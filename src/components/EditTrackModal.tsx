import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { Track } from "../types/types";

interface ModalProps {
  track: Track;
  visible: boolean;
  editTrack: (track: Track) => void;
  closeModal: () => void;
}

const EditTrackModal: React.FC<ModalProps> = ({
  track,
  visible,
  editTrack,
  closeModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      artist: track.artist,
      title: track.title,
      year: track.year,
    });
  }, [form, track]);
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      form.resetFields();
      editTrack({ ...track, ...values });
    });
    setConfirmLoading(false);
    closeModal();
  };
  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="edit-track">
        <Form.Item
          name="artist"
          label="Artiste(s)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Année de sortie"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTrackModal;
