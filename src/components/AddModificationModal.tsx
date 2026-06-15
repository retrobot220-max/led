import { Modal, Row, Col, Tag } from 'antd'
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
      <Row gutter={[12, 12]}>
        {modificationCollection.map((item) => {
          const Icon = modificationItemIcons[item.name]
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
                <Tag color={modificationTypeColors[item.type]}>
                  {modificationTypeLabels[item.type]}
                </Tag>
              </ModalIconWrap>
            </Col>
          )
        })}
      </Row>
    </Modal>
  )
}
