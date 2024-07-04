import React from 'react';
import { getChessPiece } from '../../helpers/functionHelper.js'

function Promotion({ name, onPromotionSelected }) {
  return (
    <button onClick={() => onPromotionSelected(name)}>
      <img src={getChessPiece(name)} alt={name} />
    </button>
  );
};

export default Promotion;