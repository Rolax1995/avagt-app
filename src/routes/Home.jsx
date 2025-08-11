import './Home.css';

function Home(){
    return(
    <div>
      {/* Sección 1 */}
        <div className="background-header">
            <div className="header-logo">
                <img src="/logoColor.png" alt="logo" className="logo"/>
            </div>
        </div>

      {/* Sección 2 */}
        <section className="info-section d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ maxWidth: '600px' }}>
                <h3 className="mb-3 text-center">Ava GT APP</h3>
                <p>
                Es una aplicación desarrollada especialmente para poder ingresar avaluos físcales
                esto con el objetivo de poder iniciar una estandarización ya que actualmente en Guatemala
                no se tiene una estandarización de los precios fiscales de los bienes inmuebles.
                </p>
            </div>
        </section>
    </div>
    );
}

export default Home;