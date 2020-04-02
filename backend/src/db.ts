import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

export type Media = {
	id: string;
	name: string;
	uploadTime: number;
	connectedTags?: string[];
};
export type Tag = {
	id: string;
	medias?:string[];
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

// Tag Functions

	public async AddTag(tag: Tag): Promise < any > {
		(await this.database).get('Tags', []).push(tag).value();
		(await this.database).write();
	}

	public async GetTag(tagId:string):Promise<Tag>{
		const tag = (await this.database).get('Tags')
					.find({id:tagId})
					.value();
		if(!tag)
			throw new Error("Tag with ID "+tagId+" not found");
		return tag;
	}

	public async UpdateTag(tag:Tag):Promise <any>{
		(await this.database).get('Tags')
		.find({id : tag.id})
		.assign(tag)
		.write()
	}

// Media Functions
	public async AddMedia(media:Media):Promise <any>{
		(await this.database).get('Medias', []).push(media).value();
		(await this.database).write();
	}

	public async GetMedia(mediaId:string):Promise<Media>{
		const media = (await this.database).get('Medias', [])
						.find({id:mediaId})
						.value();
		if(!media)
			throw new Error("Media with ID "+mediaId+" not found");
		return media;
	}

	public async GetAllMedia():Promise<Media[]>{
		const medias = (await this.database).get('Medias', []).value();
		if(!medias)
			throw new Error("No Medias found");
		return medias;
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
		.find({id : media.id})
		.assign(media)
		.write()
	}

	public async RemoveMedia(mediaId:string):Promise <any>{
		(await this.database).get('Medias')
		.remove({ id: mediaId })
  		.write()
	}
}

export {
	DataBase as DataBase
};