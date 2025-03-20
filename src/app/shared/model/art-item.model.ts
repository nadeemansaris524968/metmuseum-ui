export class ArtItem {
  constructor(
    public objectID: number,
    public isHighlight: boolean,
    public primaryImage: string,
    public primaryImageSmall: string,
    public additionalImages: string[],
    public department: string,
    public objectName: string,
    public title: string,
    public artistDisplayName: string,
    public objectDate: string,
    public medium: string,
    public dimensions: string,
    public creditLine: string,
    public city: string,
    public state: string,
    public country: string,
    public classification: string
  ) {}
}
