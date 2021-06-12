import React from 'react';

function Total({sousTotal})
{
    var tps = parseFloat(sousTotal * 0.05).toFixed(2);
    var tvq = parseFloat(sousTotal * 0.0975).toFixed(2);
    var total = parseFloat(sousTotal + tps + tvq).toFixed(2);

    return (
        <>
            <h3>Sous total: {sousTotal} $</h3>
            <h3>TPS (5%): {tps} $</h3>
            <h3>TVQ (9.975%): {tvq} $</h3>
            <h3>Total: {total} $</h3>
        </>
    );
}

export default Total;