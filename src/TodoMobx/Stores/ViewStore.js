import {observable} from 'mobx';
import { ALL_TODOS } from '../Constants';

export default class ViewStore {
	@observable todoBeingEdited = null;
	@observable todoFilter= ALL_TODOS;
}