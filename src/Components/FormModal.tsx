import { useEffect, useRef } from 'react'
import { Input, Modal, Form, InputRef } from 'antd'
const { TextArea } = Input

interface IComponentProps {
  isShown: boolean
  submitText: string
  title?: string
  description?: string
  handleFunction: Function
  modalHandler: VoidFunction
}

export default function FormModal({
  isShown,
  submitText,
  title,
  description,
  handleFunction,
  modalHandler,
}: IComponentProps) {
  const titleRef = useRef<InputRef>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (isShown) {
      form?.resetFields()
      setTimeout(() => {
        titleRef?.current.focus({ cursor: 'end' })
      })
    }
  }, [isShown])

  const onSubmit = async () => {
    try {
      const data = await form.validateFields()
      await handleFunction(data)
    } catch (error) {
      console.error('Validate Failed =>', error)
    }
  }

  return (
    <Modal
      forceRender
      open={isShown}
      okText={submitText}
      cancelText="Cancel"
      onCancel={modalHandler}
      onOk={onSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          initialValue={title}
          rules={[
            {
              required: true,
              message: 'Please title',
            },
          ]}
        >
          <Input showCount maxLength={30} ref={titleRef} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={description}
        >
          <TextArea autoSize style={{ resize: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
