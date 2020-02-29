export type ShipmentCargo = {
  type: string
  description: string
  volume: string
}

export type ShipmentService = {
  type: string
}

export type Shipment = {
  id: string
  name: string
  cargo: ShipmentCargo[]
  mode: string
  type: string
  destination: string
  origin: string
  services: ShipmentService[]
  total: string
  status: string
  userId: string
  [name: string]: string | ShipmentCargo[] | ShipmentService[]
}

export class DataPage {
  constructor(shipments: Shipment[], query: URLSearchParams, pageSize = 20) {
    let sortedShipments = shipments

    if (query.has('sortBy')) {
      const sortBy = query.get('sortBy') || ''
      const sortByKey = sortBy.toLowerCase()
      sortedShipments = sortedShipments.sort((a, b) => {
        if (a[sortByKey] > b[sortByKey]) {
          return 1
          // eslint-disable-next-line no-else-return
        } else if (a[sortByKey] < b[sortByKey]) {
          return -1
        }
        return 0
      })
      if (query.get('sortDir') === 'des') {
        sortedShipments.reverse()
      }
    }

    const page = parseInt(query.get('page') || '1', 10)

    const indexStart = pageSize * (page - 1)
    const indexEnd = Math.min(indexStart + pageSize, sortedShipments.length)

    this.items = sortedShipments.slice(indexStart, indexEnd) || []
    this.pagesTotal = Math.ceil((sortedShipments.length || 0) / pageSize)
    this.page = page || 1
  }

  items: Shipment[]

  pagesTotal: number

  page: number
}
