import React from 'react';
import { MdDelete, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeReserve, updateAmountRequest } from '../../store/modules/reserve/actions';

export default function Reservas() {
  const reserves = useSelector(state => state.reserve);
  const dispatch = useDispatch();

  function handleRemove(id){
    dispatch(removeReserve(id));
  }

  function decrementAmount(trip){
    dispatch(updateAmountRequest(trip.id, trip.amount -1));
  }

  function incrementAmount(trip){
    dispatch(updateAmountRequest(trip.id, trip.amount +1));
  }

  return (

    <div>
    <h1 className="title">Voce solicitou {reserves.length} reservas</h1>

    {reserves.map(reserve => (
      <div className="reservas" key={reserve.id}>
        <img
        src={reserve.image}
        alt={reserve.title}
        />
        <strong>{reserve.title}</strong>
        <div className='amount-view'>
          <button
          type="button"
          onClick={()=> decrementAmount(reserve)}
          >
            <MdRemoveCircle size={24} color="#191919" />
          </button>
          <span>{reserve.amount}</span>
          <button
          type="button"
          onClick={()=> incrementAmount(reserve)}
          >
            <MdAddCircle size={24} color="#191919" />
          </button>
        </div>
        <button
        type="button"
        onClick={()=> handleRemove(reserve.id)}
        >
          <MdDelete size={20} color="#191919" />
        </button>
      </div>
    ))}

    <footer>
      <button type="button">
        <Link to="/">
          Solicitar reservas
        </Link>
      </button>
    </footer>

    </div>
  );
}