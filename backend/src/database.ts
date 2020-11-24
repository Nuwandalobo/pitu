import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://root:pazeamor@localhost:3306/pitu');

export default sequelize;