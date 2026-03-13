import { Home, Users, BookOpen, Layers } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sidebar() {

  return (

    // <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
    <div className="w-64 bg-slate-900 text-white p-6 min-h-screen">

      <h1 className="text-2xl font-bold mb-8">
        Training Admin
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400">
            <Home size={18}/> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/users" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18}/> Users
          </Link>
        </li>

        <li>
          <Link to="/staff" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18}/> Staff
          </Link>
        </li>

        <li>
          <Link to="/students" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18}/> Students
          </Link>
        </li>

        <li>
          <Link to="/courses" className="flex items-center gap-2 hover:text-blue-400">
            <BookOpen size={18}/> Courses
          </Link>
        </li>

        <li>
          <Link to="/batches" className="flex items-center gap-2 hover:text-blue-400">
            <Layers size={18}/> Batches
          </Link>
        </li>

      </ul>

    </div>

  )

}