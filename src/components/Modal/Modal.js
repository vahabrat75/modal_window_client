import s from './Modal.module.scss'


export default function Modal({setActiveModal, children}) {

    return (
        <div className={s.modal} onClick={()=>setActiveModal(false)}>
            <div className={s.modalContainer} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

