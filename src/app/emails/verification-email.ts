export default function verficationEmailTemplate({name, url}: {name: string; url: string}){
    return `
        <html lang="es">
            <body style={{ backgroundColor: "#eef2ff", fontFamily: "Segoe UI, sans-serif" }}>
                <div style={{ maxWidth: "560px", margin: "0 auto", background: "#fff", borderRadius: "20px" }}>
                
                <div style={{ background: "linear-gradient(135deg,#4f46e5,#6366f1)", padding: "40px 48px" }}>
                    <h1 style={{ color: "#fff" }}>Hola, ${name} 👋</h1>
                </div>

                <div style={{ padding: "40px 48px" }}>
                    <p>Verifica tu correo haciendo clic aquí:</p>
                    <a href="${url}" style={{ background: "#4f46e5", color: "#fff", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
                    Verificar mi correo →
                    </a>
                </div>

                </div>
            </body>
        </html>
        ` 
}