import app from './app';

const port = process.env.PORT || 80;
const server = app.express.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
export {server as server};