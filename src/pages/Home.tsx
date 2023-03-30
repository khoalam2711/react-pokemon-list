import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="p-4 max-w-5xl mx-auto">
			<h1 className="text-2xl mb-4">React exercises</h1>
			<ul>
				<li>
					<h2 className="text-xl font-bold underline">
						<Link to="/pokemon-list">Pokemon list</Link>
					</h2>
					<p>By Lâm Ngọc Anh Khoa</p>
				</li>
			</ul>
		</div>
	);
};

export default Home;
