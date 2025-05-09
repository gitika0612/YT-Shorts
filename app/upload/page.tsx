"use client"

import { uploadShortAction } from '@/actions/upload-short';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UploadFile from '@/components/upload';
import React, { useActionState, useState } from 'react';
import { Loader2 } from "lucide-react";


const Upload = () => {
    const [formState, action, isPending] = useActionState(uploadShortAction, { errors: {} })
    const [videoUrl, setVideoUrl] = useState<string>("");

    const handleSubmit = (formData: FormData) => {
        formData.append('video', videoUrl);
        return action(formData);
    }

    return (
        <div className='max-w-md mx-auto p-6'>
            <h1 className='mb-6 text-2xl font-bold text-center'>Upload Shorts</h1>
            <form action={handleSubmit}>
                <div className='mb-4'>
                    <Label>Title</Label>
                    <Input type='text' name='title' placeholder='Enter Title...' className='mt-1' />
                    {formState.errors.title && <span className='text-red-500 text-sm'>{formState.errors.title}</span>}
                </div>
                <div className='mb-4'>
                    <Label>Description</Label>
                    <Input type='text' name='description' placeholder='Enter Description...' className='mt-1' />
                    {formState.errors.description && <span className='text-red-500 text-sm'>{formState.errors.description}</span>}
                </div>
                <div className='mb-4'>
                    <UploadFile setVideoUrl={setVideoUrl} />
                    {formState.errors.video && (
                        <span className="text-red-500 text-sm">
                            {formState.errors.video}
                        </span>
                    )}
                </div>
                {formState.errors.formError && (
                    <div className="border border-red-500 bg-red-100">
                        <p className="text-red-600">{formState.errors.formError}</p>
                    </div>
                )}
                <Button type="submit" className="w-full">
                    {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Upload"}
                </Button>
            </form>
        </div>
    )
}

export default Upload