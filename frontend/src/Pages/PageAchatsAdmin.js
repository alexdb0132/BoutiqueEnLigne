import React from 'react';
import Table from 'react-bootstrap/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/button';


function PageAchatsAdmin()
{
    return(
        <>
            <h1>AchatsEffectuer</h1>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align="center" >NomClient</TableCell>
                    <TableCell align="center" >produits</TableCell>
                    <TableCell align="center">total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                            <TableRow>
                                <TableCell align="center">Maxime</TableCell>
                                <TableCell align="center">
                                    <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" >Nomero Produit</TableCell>
                                            <TableCell align="center" >nom</TableCell>
                                            <TableCell align="center">categorie</TableCell>
                                            <TableCell align="center">prix</TableCell>
                                            <TableCell align="center">quantite</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" >1</TableCell>
                                            <TableCell align="center" >Macbook pro 2019</TableCell>
                                            <TableCell align="center">ordinateur</TableCell>
                                            <TableCell align="center">1400.99</TableCell>
                                            <TableCell align="center">1</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center" >1</TableCell>
                                            <TableCell align="center" >Macbook pro 2019</TableCell>
                                            <TableCell align="center">ordinateur</TableCell>
                                            <TableCell align="center">1400.99</TableCell>
                                            <TableCell align="center">1</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    </Table>
                                </TableCell>
                                <TableCell align="center">1500.99 $</TableCell>
                            </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default PageAchatsAdmin;