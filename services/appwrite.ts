import { Client, ID, Query, TablesDB } from 'react-native-appwrite';
// track the searches made by a user 

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!

const client = new Client()
        .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const tablesDB = new TablesDB(client);
export const updateSearchCount = async (query:string, movie:Movie)=>{
    try{
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [
            Query.equal('searchTerm',query)
        ]
    })
    console.log('this is the result ', result)
    if(result.rows.length>0){
        const existingMovie = result.rows[0];
        await tablesDB.updateRow(
            {
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingMovie.$id,
                data:{
                    count: existingMovie.count + 1
                }
            }
        )
    } else {
        await tablesDB.createRow(
            {
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data:{
                    searchTerm: query,
                    movie_id: movie.id,
                    count:1,
                    poster_url: process.env.EXPO_PUBLIC_IMAGE_BASE_URL+movie.poster_path,
                    title:movie.title
                }
            }
        )
    }
}catch(e){
    console.log('error on update search count ', e)
}
}