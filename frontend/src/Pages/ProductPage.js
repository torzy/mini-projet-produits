import React, {Component} from 'react';
import {variables} from '../Variables.js';

export class ProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            products: [],
            searchText: '',
            modalTitle: "",
            id: 0,
            ProdNom: "",
            ProdQuantite: 0,
            ProdPrix: 0
        };
    }

    // Function to clear modal inputs
    clearModalInputs = () => {
        this.setState({
            ProdNom: '',
            ProdQuantite: 0,
            ProdPrix: 0,
        });
    };


    closeModal = () => {
        this.clearModalInputs();
        this.setState({showModal: false});
    };

    // Function to fetch the list of products from the API
    fetchProducts() {
        fetch(variables.API_URL + 'produits/')
            .then(response => response.json())
            .then(data => {
                this.setState({products: data});
            });
    }

    // Function to add a new product
    addClick() {
        this.clearModalInputs();
        this.setState({
            modalTitle: "Ajouter Produit",
            id: 0,
            showModal: true
        });
    }

    editClick(prod) {
        this.setState({
            showModal: true,
            modalTitle: "Modifier Produit",
            id: prod.produitId,
            ProdPrix: prod.PrixUnitaire,
            ProdNom: prod.Nom,
            ProdQuantite: prod.Quantite
        });
    }

    createClick() {
        fetch(variables.API_URL + 'produits/', {
            method: 'POST', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify({
                Nom: this.state.ProdNom,
                Quantite: this.state.ProdQuantite,
                PrixUnitaire: this.state.ProdPrix,
            })
        })
            .then(res => res.json())
            .then((result) => {
                // After successful update, hide the modal
                this.setState({showModal: false});
                alert(result);
                this.componentDidMount();
            }, (error) => {
                alert('Failed');
            });
    }

    updateClick() {
        fetch(variables.API_URL + 'produits/' + this.state.id + '/', {
            method: 'PUT', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify({
                Nom: this.state.ProdNom,
                Quantite: this.state.ProdQuantite,
                PrixUnitaire: this.state.ProdPrix,
            })
        })
            .then(res => res.json())
            .then((result) => {
                // After successful update, hide the modal
                this.setState({showModal: false});
                alert(result);
                this.componentDidMount();
            }, (error) => {
                alert('Failed');
            });
    }

    deleteClick(id) {

        if (window.confirm('Etes vous sûr?')) {
            fetch(variables.API_URL + 'produits/' + id + '/', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.componentDidMount();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    // Function to handle the search
    handleSearch = async () => {
        try {
            const response = await fetch(variables.API_URL + `produits?search=${this.state.searchText}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            this.setState({products: data});
        } catch (error) {
            console.error('Error searching:', error);
        }
    };


    // Fetch products on component mount
    componentDidMount() {
        this.fetchProducts();
    }

    //Changer le contenu du nom du produit dans l'input
    changeProductName = (e) => {
        this.setState({ProdNom: e.target.value});
    }

    //Changer le contenu du prix du produit dans l'input
    changeProductPrice = (e) => {
        this.setState({ProdPrix: e.target.value});
    }
    //Changer le contenu de la quantité du produit dans l'input
    changeProductQuantity = (e) => {
        this.setState({ProdQuantite: e.target.value});
    }

    render() {
        const {modalTitle, products, searchText, id, ProdNom, ProdQuantite, ProdPrix} = this.state;

        return (<div>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Rechercher produit..."
                value={searchText}
                onBlur={() => this.componentDidMount()}
                onChange={(e) => this.setState({searchText: e.target.value})}
            />
            <button onClick={this.handleSearch}>Rechercher</button>

            <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProduit"
                    onClick={() => this.addClick()}>
                Ajouter Produit
            </button>
            {/* Bootstrap table to list products */}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.produitId}>
                        <td>{product.produitId}</td>
                        <td>{product.Nom}</td>
                        <td>{product.PrixUnitaire}</td>
                        <td>{product.Quantite}</td>
                        <td>
                            <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalProduit"
                                    onClick={() => this.editClick(product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={() => this.deleteClick(product.produitId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>

                        </td>
                    </tr>))}
                </tbody>
            </table>

            <div className="modal fade" id="modalProduit" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.closeModal}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nom Produit</span>
                                <input required type="text" className="form-control"
                                       value={ProdNom}
                                       onChange={this.changeProductName}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Prix Produit</span>
                                <input required type="number" step="0.1" className="form-control"
                                       value={ProdPrix}
                                       onChange={this.changeProductPrice}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Quantité Produit</span>
                                <input required type="number" className="form-control"
                                       value={ProdQuantite}
                                       onChange={this.changeProductQuantity}
                                />
                            </div>

                            {id === 0 ? <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.createClick()}
                            >Créer</button> : null}

                            {id !== 0 ? <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.updateClick()}
                            >Modifier</button> : null}

                        </div>

                    </div>
                </div>
            </div>

        </div>);
    }
}

