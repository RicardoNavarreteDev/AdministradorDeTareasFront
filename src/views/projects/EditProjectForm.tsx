import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";


type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:  {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    } })

    const handleForm = (formData: ProjectFormData) =>{
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

                <nav className="my-5">
                    <Link
                        className="bg-custom-blue-logo hover:bg-gray-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>
                
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm
                        register = {register}
                        errors = {errors}
                    />

                    <input 
                        type="submit" 
                        value='Guardar cambios'
                        className=" g-custom-blue-logo hover:bg-gray-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"  
                    />
                </form>
            </div>
        </>
    )
}
