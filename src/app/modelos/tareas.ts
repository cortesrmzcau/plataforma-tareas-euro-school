export class tareaMaestro {
    archivoId: any;
    profesorId: any;
    nombre: any;
    grado: any;
    semanaId: any;
    tipo: any;
    fecha: any;
    url: any;
}

export class tareaAlumno {
    alumnoId: any;
    fecha: any;
    grado: any;
    id: any;
    nombre: any;
    profesorId: any;
    semanaId: any;
    url: any;
    calificacion?: any;
}

export class subirTarea {
    nombre: any;
    url: any;
    grado: any;
    fecha: any;
    calificacion: any;
    alumnoId: any;
    semanaId: any;
    profesorId: any;
}


export class Upload {
	file:File;
	name:string;
	url:string;
	progress:number;
  
	constructor(file:File) {
        this.file = file;
	}
}