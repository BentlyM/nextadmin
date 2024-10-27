import { fetchProduct } from '@/app/lib/data';
import styles from './singleProduct.module.css';
import Image from 'next/image';
import { addProduct, updateProduct } from '../add/_actions/product';

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const {id} = await params; // next js 15 moment
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product?.img as string} alt="" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product?.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product?.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={String(product?.price)} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={String(product?.stock)} />
          <label>Color</label>
          <input type="text" name="color" placeholder={product?.color as string} />
          <label>Size</label>
          <textarea name="size" placeholder={product?.size as string} />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea name="desc" id="desc" rows={10} placeholder={product?.desc}></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
