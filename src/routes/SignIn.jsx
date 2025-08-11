import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'

function SignIn() {
    //Valor máximo para archivos pdf
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB en bytes

    //variables dependientes
    const [tipoUsuario, setTipoUsuario] = useState('2');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [pdf1, setPdf1] = useState(null);
    const [pdf2, setPdf2] = useState(null);
    const [colegiado, setColegiado] = useState('');
    const [isColegiado, setIsColegiado] = useState(false);


    //Variables individuales
    const [nombre1, setNombre1] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [nombre3, setNombre3] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [dpi, setDpi] = useState('');
    const [nit, setNit] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');


    const handleTipoChange = (e) => {
        setTipoUsuario(e.target.value);
        switch(e.target.value){
            case '2': setIsColegiado(false);
                break;

            case '3': setIsColegiado(true);
                break;

            default : return (alert('Seleccione un tipo de usuario valido.'));
        }
            
    };

    const handlePdf1Change = (e) => {
        const file = e.target.files[0];
        
        if (file && file.size > MAX_FILE_SIZE) {
            alert('El archivo PDF con el DPI excede el tamaño máximo de 25MB.');
            e.target.value = null; // Limpia el input
            return;
        }
        setPdf1(file);
    };

    const handlePdf2Change = (e) => {
        const file = e.target.files[0];
            if (file && file.size > MAX_FILE_SIZE) {
            alert('El archivo PDF 2 excede el tamaño máximo de 25MB.');
            e.target.value = null;
            return;
        }
        setPdf2(file);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        if (password1 !== password2) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setError('');
        
        const nombreCompleto = `${nombre1.trim()} ${nombre2.trim()} ${nombre3.trim()}`;
        const apellidoCompleto = `${apellido1.trim()} ${apellido2.trim()}`;
        var pathExpediente = '';

        // Archivos
        const formData = new FormData();
        formData.append('dpi', dpi);
        formData.append('tipoUsuario',tipoUsuario);
        formData.append('dpiPDF', pdf1);
        if (tipoUsuario === '2') {
            formData.append('cvPDF', pdf2);
        }

        try {
            const response = await axios.post('http://localhost:4000/user/archivos', formData, {
                headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
                }
            });

            const data = response.data;
            const estado = false;
            console.log('Respuesta del servidor:', data);
            if(response.status !== 404 && response.status !== 200) return alert(data.message);
            if(data.dir){
                try{
                    pathExpediente = data.dir;
                    const res = await axios.post('http://localhost:4000/user/register', {
                        IdRol: tipoUsuario,
                        Colegiado: colegiado,
                        Nombres:nombreCompleto,
                        Apellidos:apellidoCompleto,
                        Nit:nit,
                        Telefono:telefono,
                        Correo:correo,
                        Password:password1,
                        RutaExpediente:pathExpediente,
                        Estado:estado,
                        DPI:dpi,
                        Direccion:direccion
                    });

                    alert('Usurio creado exitosamente, se estará enviando un email de confirmación cuando este activo.');
                } catch(err){
                    console.error('Error al registrar el usuario:', err);
                }
                
            }

            
            
        } catch (err) {
            console.error('Error al registrar expediente:', err);
        }

        //navigate('/dashboard');
    } catch (err) {
      alert('Problemas al formar el form data.');
    }
  };

  return (
    <div className="container mt-4">
        <div className="background-header">
            <div className="header-logo">
                <img src="/logoColor.png" alt="logo" className="logo"/>
            </div>
        </div>
        <section className="info-section justify-content-center align-items-center">
            <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                {/* Tipo de usuario */}
                <div className="mb-3">
                    <label className="form-label">Tipo de usuario:</label>
                    <div>
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="tipoUsuario"
                        value="2"
                        checked={tipoUsuario === '2'}
                        onChange={handleTipoChange}
                        />
                        <label className="form-check-label">Valuador</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="tipoUsuario"
                        value="3"
                        checked={tipoUsuario === '3'}
                        onChange={handleTipoChange}
                        />
                        <label className="form-check-label">Técnico de Campo</label>
                    </div>
                    </div>
                </div>

                {/* Nombres */}
                <div className="row">
                    <div className="col-md-4 mb-3">
                    <input type="text" className="form-control" placeholder="Primer Nombre" required value={nombre1} onChange={(e) => setNombre1(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                    <input type="text" className="form-control" placeholder="Segundo Nombre" value={nombre2} onChange={(e) => setNombre2(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                    <input type="text" className="form-control" placeholder="Tercer Nombre" value={nombre3} onChange={(e) => setNombre3(e.target.value)}/>
                    </div>
                </div>

                {/* Apellidos */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Primer Apellido" required value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Segundo Apellido" value={apellido2} onChange={(e) => setApellido2(e.target.value)}/>
                    </div>
                </div>

                {/* Otros campos */}
                <input type="text" className="form-control mb-3" placeholder="DPI" required value={dpi} onChange={(e) => setDpi(e.target.value)}/>
                <input type="text" className="form-control mb-3" placeholder="NIT" required value={nit} onChange={(e) => setNit(e.target.value)}/>
                <input type="text" className="form-control mb-3" placeholder="Dirección" required value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                <input type="text" className="form-control mb-3" placeholder="Teléfono" required value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <input type="text" disabled={isColegiado} className="form-control mb-3" placeholder="No. Colegiado" required value={colegiado} onChange={(e) => setColegiado(e.target.value)} />

                {/* Contraseñas */}
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirmar Contraseña"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Archivos PDF */}
                {tipoUsuario === '2' && (
                    <div className="mb-3">
                        <label className="form-label">Sube tu DPI en formato PDF:</label>
                        <input type="file" className="form-control mb-2" accept="application/pdf" required onChange={handlePdf1Change}/>
                        <label className="form-label">Sube tu CV en formato PDF:</label>
                        <input type="file" className="form-control" accept="application/pdf" required onChange={handlePdf2Change}/>
                    </div>
                )}
                {tipoUsuario === '3' && (
                    <div className="mb-3">
                        <label className="form-label">Sube tu DPI en formato PDF</label>
                        <input type="file" className="form-control" accept="application/pdf" required onChange={handlePdf1Change}/>
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </section>
    </div>
  );
}

export default SignIn;
