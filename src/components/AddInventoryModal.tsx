import { Modal, List, Tag } from 'antd'
import {
  inventoryCollection,
  inventoryItemIcons,
  inventoryTypeColors,
  inventoryTypeLabels,
} from '../data/inventory'
import type { InventoryItem } from '../models/inventory'
import { ModalIconWrap } from '../styles'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (item: InventoryItem) => void
}

export const AddInventoryModal = ({ open, onClose, onSelect }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Добавить предмет'
      destroyOnHidden
    >
      <List
        dataSource={inventoryCollection}
        grid={{ gutter: 12, xs: 2, sm: 3, md: 4 }}
        renderItem={(item) => {
          const Icon = inventoryItemIcons[item.name]
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
                <Tag color={inventoryTypeColors[item.type]}>
                  {inventoryTypeLabels[item.type]}
                </Tag>
              </ModalIconWrap>
            </List.Item>
          )
        }}
      />
    </Modal>
  )
}
