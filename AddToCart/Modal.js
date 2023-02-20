import './modal.css';
import React, { Component } from 'react';
import AddToCart from './AddToCart';

class Modal extends Component {
  constructor(props){
    super(props)
    this.state={
      url :""
    }
  }

  handleChangeUrl = (event) =>{
    this.setState({
      url:event.target.value
    })
  }
  render() {
    const {
      handleClose,
      children: { props: { width, src, height ,id } = {} } = {},
      show,
      handleUrl
    } = this.props
    return (
      <div className={show}>
        <section className="modal-main">
          <img src={src} width={width} height={height} id={id} />
        <label>URL</label>
        <input placeholder='Paste/type the URL' name='changeImageUrl' onChange={this.handleChangeUrl}></input>
        <input type="button" onClick={() => handleUrl(this.state.url,id)} value="Change"></input>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  }
};

export default Modal