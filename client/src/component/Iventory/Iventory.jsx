import IventoryCell from "./IventoryCell";

const Iventory = () => {
    return (
        <div style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                display:'grid',
                gridTemplateColumns: '90px 90px 90px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '5px',
            }}>
                <IventoryCell/>
                <IventoryCell/>
                <IventoryCell/>
                <IventoryCell/>
                <IventoryCell/>
                <IventoryCell/>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    border: '3px solid black',
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: '#807F7F'
                }}>
                    中立装备
                </div>
            </div>
        </div>
    )
}

export default Iventory;