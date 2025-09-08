import { useState } from 'react'
import uploadImage from '../utils/uploadImage.js'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuth()
  const [imageUrl, setImageUrl] = useState('')

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const { imageUrl } = await uploadImage(file)
      setImageUrl(imageUrl)
      toast.success('Uploaded!')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <div className="max-w-xl">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
        <div className="text-lg font-semibold">Profile</div>
        <div className="text-sm text-slate-400">Name: {user?.fullName}</div>
        <div className="text-sm text-slate-400">Email: {user?.email}</div>

        <div className="mt-4">
          <label className="block text-sm mb-1">Upload profile image</label>
          <input type="file" accept="image/*" onChange={onFile} className="block" />
          {imageUrl && (
            <img src={imageUrl} alt="profile" className="mt-3 h-28 w-28 object-cover rounded-full border border-white/10" />
          )}
        </div>
      </div>
    </div>
  )
}
