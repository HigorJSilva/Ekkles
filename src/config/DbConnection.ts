import mongoose, {ConnectOptions} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let url = 'mongodb+srv://'+
`${process.env.USUARIO}:${process.env.SENHA}`+
'@cluster0-h5y5e.mongodb.net/'+
`${process.env.DATABASE}?retryWrites=true&w=majority`



/**
 * Classe de conexão do banco de dados mongodb
 * No iniciador da classe é feito a conexão e importada para a API
 */
export = class MongoDB {
    database: any

    constructor(){
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions
          ).then(() =>{
            console.log("MongoDB is running at " + url);
        }).catch((err) => {
            console.error(err);
        });
    }
}