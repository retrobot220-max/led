import { Modal, Row, Col, Tag } from 'antd'
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
      <Row gutter={[12, 12]}>
        {inventoryCollection.map((item) => {
          const Icon = inventoryItemIcons[item.name]
          return (
            <Col key={item.name} xs={12} sm={8} md={6}>
              <ModalIconWrap
                onClick={() => {
                  onSelect(item)
                  onClose()
                }}
                style={{ height: '100%' }}
              >
                <Icon className='slot-icon' />
                <span className='slot-title'>{item.title}</span>
                <Tag color={inventoryTypeColors[item.type]}>
                  {inventoryTypeLabels[item.type]}
                </Tag>
              </ModalIconWrap>
            </Col>
          )
        })}
      </Row>
    </Modal>
  )
}
