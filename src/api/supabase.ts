import { createClient } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid'

const {
  VITE_SUPABASE_PROJECT_URL,
  VITE_SUPABASE_API_KEY,
  VITE_SUPABASE_IMAGES_FOLDER,
  VITE_SUPABASE_IMAGES_URL,
} = import.meta.env

const supabase = createClient(VITE_SUPABASE_PROJECT_URL, VITE_SUPABASE_API_KEY)

export async function getImage(name: string) {
  const { data, error } = await supabase.storage.from(VITE_SUPABASE_IMAGES_FOLDER).list(name, {
    limit: 1,
    offset: 0,
  })

  if (error) {
    console.error('Error while getting media: ' + name, error)
  }

  return data ? data[0] : null
}

export async function uploadImage(file: File) {
  const name = file.name + '-' + uuid()
  const { data, error } = await supabase.storage
    .from(VITE_SUPABASE_IMAGES_FOLDER)
    .upload(name, file)

  if (error) {
    console.error('Error while uploading image: ' + name, error)
  }

  return data ? VITE_SUPABASE_IMAGES_URL + '/' + data.path : ''
}
