import { Client, Databases, ID, Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_DATABASE_KEY;
const PROJECT_ID = import.meta.env.VITE_PROJECT_KEY;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_KEY;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async(search, movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID, 
            [
                Query.equal('search', search)
            ]
        );
        
        if(result.documents.length > 0) {
            const document = result.documents[0];
            
            await database.updateDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                document.$id, 
                {
                    count: document.count + 1
                }
            );
        } else {
            await database.createDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                ID.unique(), 
                {
                    search,
                    count: 1,
                    movie_id: movie.id,
                    img_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            );
        }
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};
export const getTrendingMovies = async() => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID, 
            [
                Query.orderDesc('count'),
                Query.limit(5)
            ]
        );
        
        return result.documents;
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}