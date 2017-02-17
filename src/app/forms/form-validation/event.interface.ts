export class EventCoding {
  constructor(
    public name: string = null,
    public description: string = null,
    public image_url: string = null, // TODO storage
    public date: string = null,
    public address: string = null, // TODO 지도
    public latlad: string = null, // TODO 지도
    public participants : any = [],
  ){}
}
