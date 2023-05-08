export default interface IPostRequest {
    id: string;
    title: string;
    body: string;
    description: string,
    isActive: boolean,
    userId: string
    tagsPost: []
}
