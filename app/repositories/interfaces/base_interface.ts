export default interface BaseRepository<T> {
  findById(id: any): Promise<Partial<T> | null>
  find(): Promise<Partial<T[]>>
  create(id: any, item: Partial<T>): Promise<T>
  update(id: any, item: Partial<T>): Promise<T>
  delete(id: any): Promise<T>
}
