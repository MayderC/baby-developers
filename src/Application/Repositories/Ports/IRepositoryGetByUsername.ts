
export default interface IRepositoryGetByUsername<T> {
  getByUsername(id: string): Promise<T | null>;
}