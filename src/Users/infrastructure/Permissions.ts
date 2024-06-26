const rolePermissions = {
    admin: ["abrirPuerta", "cerrarPuerta"],
    esposa: ["permiso3", "permiso4"],
    hijo: ["permiso5", "permiso6"],
    invitado: ["permiso7", "permiso8"],
    ladron: []
} as const; 

type Role = keyof typeof rolePermissions; 

export { rolePermissions, Role };
