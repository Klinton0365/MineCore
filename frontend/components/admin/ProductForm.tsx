'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Category, Product, Branch } from '@/lib/types';

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

interface SpecEntry {
  key: string;
  value: string;
}

interface BranchStock {
  branch_id: number;
  stock_status: 'in_stock' | 'limited' | 'out_of_stock';
}

export function ProductForm({ product, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  // Form state
  const [name, setName] = useState(product?.name || '');
  const [categoryId, setCategoryId] = useState<number | ''>(product?.category_id || '');
  const [description, setDescription] = useState(product?.description || '');
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isProductOfWeek, setIsProductOfWeek] = useState(product?.is_product_of_week ?? false);
  const [featuredBadge, setFeaturedBadge] = useState(product?.featured_badge || '');
  const [specs, setSpecs] = useState<SpecEntry[]>(() => {
    if (product?.specifications) {
      return Object.entries(product.specifications).map(([key, value]) => ({ key, value }));
    }
    return [{ key: '', value: '' }];
  });
  const [branchStocks, setBranchStocks] = useState<BranchStock[]>(() => {
    if (product?.branches) {
      return product.branches.map(b => ({
        branch_id: b.id,
        stock_status: b.pivot.stock_status,
      }));
    }
    return [];
  });

  // Images
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(product?.images || []);

  useEffect(() => {
    api.get<Category[]>('/categories').then(setCategories).catch(() => {});
    api.get<Branch[]>('/branches/public').then(setBranches).catch(() => {});
  }, []);

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }]);
  const removeSpec = (i: number) => setSpecs(specs.filter((_, idx) => idx !== i));
  const updateSpec = (i: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[i][field] = val;
    setSpecs(updated);
  };

  const toggleBranch = (branchId: number) => {
    const exists = branchStocks.find(b => b.branch_id === branchId);
    if (exists) {
      setBranchStocks(branchStocks.filter(b => b.branch_id !== branchId));
    } else {
      setBranchStocks([...branchStocks, { branch_id: branchId, stock_status: 'in_stock' }]);
    }
  };

  const updateBranchStatus = (branchId: number, status: 'in_stock' | 'limited' | 'out_of_stock') => {
    setBranchStocks(branchStocks.map(b => b.branch_id === branchId ? { ...b, stock_status: status } : b));
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!product || !confirm('Delete this image?')) return;
    try {
      await api.delete(`/admin/products/${product.id}/images/${imageId}`);
      setExistingImages(existingImages.filter(img => img.id !== imageId));
    } catch {
      setError('Failed to delete image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const specifications: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.value.trim()) {
        specifications[s.key.trim()] = s.value.trim();
      }
    });

    const payload = {
      name,
      category_id: categoryId,
      description,
      is_active: isActive,
      is_featured: isFeatured,
      is_product_of_week: isProductOfWeek,
      featured_badge: featuredBadge || null,
      specifications: Object.keys(specifications).length > 0 ? specifications : null,
      branch_ids: branchStocks,
    };

    try {
      let savedProduct: Product;
      if (isEdit && product) {
        savedProduct = await api.put<Product>(`/admin/products/${product.id}`, payload);
      } else {
        savedProduct = await api.post<Product>('/admin/products', payload);
      }

      // Upload new images
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append('image', file);
          await api.post(`/admin/products/${savedProduct.id}/images`, formData);
        }
      }

      router.push('/admin/products');
    } catch (err: unknown) {
      const apiErr = err as { message?: string; errors?: Record<string, string[]> };
      if (apiErr.errors) {
        const messages = Object.values(apiErr.errors).flat();
        setError(messages.join(', '));
      } else {
        setError(apiErr.message || 'Failed to save product');
      }
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'w-full bg-secondary border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 transition-colors';
  const labelClass = 'block text-sm font-medium text-text-secondary mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Basic Information</h3>

        <div>
          <label className={labelClass}>Product Name *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className={inputClass} placeholder="e.g. Caterpillar 797F Haul Truck" />
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} required className={inputClass}>
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} className={inputClass} placeholder="Detailed product description..." />
        </div>
      </div>

      {/* Status & Flags */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Status & Visibility</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-secondary text-accent-blue focus:ring-accent-blue/50" />
            <span className="text-sm text-text-secondary group-hover:text-white transition-colors">Active</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-secondary text-accent-gold focus:ring-accent-gold/50" />
            <span className="text-sm text-text-secondary group-hover:text-white transition-colors">Featured</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={isProductOfWeek} onChange={e => setIsProductOfWeek(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-secondary text-accent-cyan focus:ring-accent-cyan/50" />
            <span className="text-sm text-text-secondary group-hover:text-white transition-colors">Product of Week</span>
          </label>
        </div>

        {(isFeatured || isProductOfWeek) && (
          <div>
            <label className={labelClass}>Featured Badge Text</label>
            <input type="text" value={featuredBadge} onChange={e => setFeaturedBadge(e.target.value)} className={inputClass} placeholder="e.g. Best Seller, New Arrival" />
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Specifications</h3>
          <button type="button" onClick={addSpec} className="text-xs text-accent-blue hover:text-blue-400 transition-colors">
            + Add Field
          </button>
        </div>

        {specs.map((spec, i) => (
          <div key={i} className="flex gap-3 items-start">
            <input type="text" value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)}
              className={`${inputClass} flex-1`} placeholder="e.g. Engine Power" />
            <input type="text" value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)}
              className={`${inputClass} flex-1`} placeholder="e.g. 2,983 kW" />
            {specs.length > 1 && (
              <button type="button" onClick={() => removeSpec(i)} className="mt-2 text-red-400 hover:text-red-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Branch Stock */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Branch Availability</h3>

        <div className="space-y-3">
          {branches.map(branch => {
            const bs = branchStocks.find(b => b.branch_id === branch.id);
            return (
              <div key={branch.id} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${bs ? 'border-accent-blue/30 bg-accent-blue/5' : 'border-white/5 bg-white/[0.02]'}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={!!bs} onChange={() => toggleBranch(branch.id)}
                    className="w-4 h-4 rounded border-white/20 bg-secondary text-accent-blue focus:ring-accent-blue/50" />
                  <div>
                    <span className="text-sm text-white font-medium">{branch.name || branch.country}</span>
                    <span className="text-xs text-text-muted ml-2">{branch.region_code}</span>
                  </div>
                </label>
                {bs && (
                  <select value={bs.stock_status} onChange={e => updateBranchStatus(branch.id, e.target.value as BranchStock['stock_status'])}
                    className="bg-secondary border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-blue/50">
                    <option value="in_stock">In Stock</option>
                    <option value="limited">Limited</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Images */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Images</h3>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {existingImages.map(img => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden border border-white/10">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${img.image_path}`}
                  alt=""
                  className="w-full aspect-square object-cover"
                />
                <button type="button" onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {img.is_primary && (
                  <span className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 bg-accent-blue/80 text-white rounded">Primary</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload new */}
        <div>
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-accent-blue/30 transition-colors">
              <svg className="w-8 h-8 mx-auto text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
              <p className="text-sm text-text-muted">Click to upload images</p>
              <p className="text-xs text-text-muted/60 mt-1">PNG, JPG up to 5MB each</p>
            </div>
            <input type="file" multiple accept="image/*" className="hidden"
              onChange={e => {
                if (e.target.files) setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
              }} />
          </label>

          {imageFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imageFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5 text-xs text-text-secondary">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => setImageFiles(imageFiles.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="bg-accent-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')}
          className="text-text-muted hover:text-white px-4 py-2.5 text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
