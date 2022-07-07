import api from '../../../services/api';
import history from '../../../services/history';
import { addReserveSucess, updateAmountSucess } from './actions';
import { call, put, all, select, takeLatest } from 'redux-saga/effects';

function* addToReserve({ id }){
    const tripExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const mySotck = yield call(api.get , `/stock/${id}`);

    const sotckAmount = mySotck.data.amount;

    const currentStock = tripExists ? tripExists.amount : 0;

    const amount = currentStock + 1;

    if(amount > sotckAmount){
        alert('Quantidade máxima em estoque atingida!')
        return;
    }

    if(tripExists){

        yield put(updateAmountSucess(id, amount));

    }else{
        const response = yield call(api.get, `trips/${id}`);
    
        const data = {
            ...response.data,
            amount: 1,
        };

        yield put(addReserveSucess(data))
        history.push('/reservas');
    }
}

function* updateAmount({ id, amount }){
    if(amount <= 0) return;    

    const myStock = yield call(api.get, `/stock/${id}`);

    const stockAmount = myStock.data.amount;

    if(amount > stockAmount){
        alert('Quantidade máxima em estoque atingida!')
        return;
    }

    yield put(updateAmountSucess(id, amount));

}

export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
])