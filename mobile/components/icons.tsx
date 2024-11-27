import {
  AlertCircle,
  CheckCircle,
  LucideIcon,
  XCircle,
  Hammer,
  Sun,
  Moon,
  LayoutDashboard,
  CircleUserRound,
  Bike,
  FileText,
  Users,
  Component,
} from 'lucide-react-native'
import { cssInterop } from 'nativewind'

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })
}

interopIcon(AlertCircle)
interopIcon(CheckCircle)
interopIcon(XCircle)
interopIcon(Hammer)
interopIcon(Sun)
interopIcon(Moon)
interopIcon(LayoutDashboard)
interopIcon(CircleUserRound)
interopIcon(Bike)
interopIcon(FileText)
interopIcon(Component)
interopIcon(Users)

export {
  AlertCircle,
  CheckCircle,
  XCircle,
  Hammer,
  Sun,
  Moon,
  LayoutDashboard,
  CircleUserRound,
  Bike,
  FileText,
  Component,
  Users,
}
