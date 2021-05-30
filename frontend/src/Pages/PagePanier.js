import React from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/button';

function PagePanier()
{
    return(
        <>
            <h1>Votre Panier</h1>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center" >Article</TableCell>
                    <TableCell align="center">Quantité</TableCell>
                    <TableCell align="center">Prix</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                            <TableRow>
                                <TableCell align="center">Macbook</TableCell>
                                <TableCell align="center"> 1 &nbsp;&nbsp;<Button variant="outline-dark" >+</Button>&nbsp;<Button variant="outline-dark">-</Button></TableCell>
                                <TableCell align="center">1399.99</TableCell>
                            </TableRow>
                </TableBody>
            </Table>
            <div style={{"text-align": "right"}}>
            <h3>Total: 1399.99 $</h3>
            <h4>TPS: 150 $</h4>
            <h4>TVQ: 75 $</h4>
            <h2>SousTotal: 1500.99 $</h2>

            <Button variant="success">Confirmer</Button>
            </div>
        </>
    )
}

export default PagePanier;