import { Modal, List, Tag } from 'antd'
import {
  modificationCollection,
  modificationItemIcons,
  modificationTypeColors,
  modificationTypeLabels,
} from '../data/modifications'
import type { ModificationItem } from '../models/modification'
import { ModalIconWrap } from '../styles'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (item: ModificationItem) => void
}

export const AddModificationModal = ({ open, onClose, onSelect }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Добавить модификацию'
      destroyOnHidden
    >
      <List
        dataSource={modificationCollection}
        grid={{ gutter: 12, xs: 2, sm: 3, md: 4 }}
        renderItem={(item) => {
          const Icon = modificationItemIcons[item.name]
          return (
            <List.Item>
              <ModalIconWrap
                onClick={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Icon className='slot-icon' />
                <span className='slot-title'>{item.title}</span>
                <Tag color={modificationTypeColors[item.type]}>
                  {modificationTypeLabels[item.type]}
                </Tag>
              </ModalIconWrap>
            </List.Item>
          )
        }}
      />
    </Modal>
  )
}
