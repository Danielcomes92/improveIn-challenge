import React from 'react'

import Card from './Card'

const CardsContainer = ({data}) => {
    return (
        <div className="cardsContainer">
            {
                data.map((band, index) => {
                    return <Card key={index} band={band} />
                })
            }
        </div>
    )
}
export default CardsContainer