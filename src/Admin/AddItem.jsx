import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SectionTitle from '../pages/reusable/SectionTitle';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { Helmet } from 'react-helmet-async';

const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=dacc7ce370205c8c7320be37f75575cd`;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imgRes = await fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            });
            const imgData = await imgRes.json();

            if (imgData.success) {
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: imgData.data.display_url
                };

                const menuRes = await axiosSecure.post('/menu', menuItem);
                if (menuRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error('Error adding item:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="w-full">
           <Helmet>
            <title>Bistro Boss | Add Item</title>
        </Helmet>
            <SectionTitle
                topText="---What's new?---"
                mainText="ADD AN ITEM"
            />
            
            <div className="bg-[#F3F3F3] p-8 max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-gray-600 mb-2 block">Recipe name*</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Recipe name"
                            className="w-full p-3 border border-gray-300 rounded bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-600 mb-2 block">Category*</label>
                            <select 
                                {...register("category", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded bg-white"
                            >
                                <option value="">Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-600 mb-2 block">Price*</label>
                            <input
                                type="text"
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="w-full p-3 border border-gray-300 rounded bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 mb-2 block">Recipe Details*</label>
                        <textarea
                            {...register("recipe", { required: true })}
                            placeholder="Recipe Details"
                            className="w-full p-3 border border-gray-300 rounded bg-white h-32"
                        ></textarea>
                    </div>

                    <div>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input file-input-bordered w-full max-w-xs bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#B58130] text-white px-6 py-2 rounded flex items-center gap-2"
                    >
                        {loading ? 'Adding...' : 'Add Item'} 
                        <span className="text-xl">🍽️</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;