import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

export interface Media {
	name: string;
	uploadTime: Date;
	connectedTags: Tag[];
};
export interface Tag {
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
	}
}

export {
	DataBase as DataBase
};