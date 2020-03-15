import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

export type Media = {
	id: string;
	name: string;
	uploadTime: number;
	connectedTags: Tag[];
};
export type Tag = {
	id: string;
	// 	medias:Media[];
};


type Schema = {
	Tags: Tag[];
	Medias: Media[];
};

class DataBase {
	database: Promise < lowdb.LowdbAsync < Schema >>

		constructor() {
			this.initDatabase();
		}

	public async initDatabase() {
		const adapter = new FileAsync < Schema > ('./database.json');
		this.database = lowdb(adapter);

		if (!(await this.database).has("Tags").value()) {
			(await this.database).defaults({
				Tags: [],
				Medias:[],
			}).write();
		}

	}

	public async AddTag(tag: Tag): Promise < any > {
		(await this.database).get('Tags', []).push(tag).value();
		(await this.database).write();
	}

	public async AddMedia(media:Media):Promise <any>{
		(await this.database).get('Medias', []).push(media).value();
		(await this.database).write();
	}

	public async MediaExists(filename:string):Promise <boolean>{
		const media = (await this.database).get('Medias')
						.find({name:filename})
						.value()
		if (media) return true;
		return false;
	}

	public async UpdateMedia(media:Media):Promise <any>{
		(await this.database).get('Medias')
		.find({name : media.name})
		.assign(media)
		.write()
	}
}

export {
	DataBase as DataBase
};