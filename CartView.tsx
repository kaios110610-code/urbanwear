"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { brl } from "@/lib/format";
import ProductImage from "./ProductImage";

const FREE_SHIPPING = 299;
const SHIPPING = 19.9;
const WHATSAPP = "5535998674116";

export default function CartView() {
const { items, subtotal, setQty, remove, clear } = useCart();

const [done, setDone] = useState(false);
const [name, setName] = useState("");
const [address, setAddress] = useState("");

const shipping =
subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;

function sendOrder() {
if (!name.trim() || !address.trim()) {
alert("Preencha seu nome e endereço.");
return;
}

```
const products = items
  .map(
    (i) =>
      `• ${i.name} | Tam: ${i.size} | Qtd: ${i.qty} | ${brl(
        i.price * i.qty
      )}`
  )
  .join("\n");

const message = `🛍️ *NOVO PEDIDO - URBANWEAR*
```

👤 *Cliente:* ${name}
📍 *Endereço:* ${address}

📦 *Produtos:*
${products}

💰 *Subtotal:* ${brl(subtotal)}
🚚 *Frete:* ${shipping ? brl(shipping) : "Grátis"}
💵 *TOTAL:* ${brl(subtotal + shipping)}

Aguardo confirmação do pedido.`;

```
const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  message
)}`;

window.open(url, "_blank");

clear();
setDone(true);
```

}

if (done) {
return ( <div className="mx-auto max-w-xl px-4 py-24 text-center"> <h1 className="font-display text-5xl uppercase">
Pedido enviado </h1>

```
    <p className="mt-4 text-neutral-600">
      Seu pedido foi encaminhado para o WhatsApp da UrbanWear.
    </p>

    <Link
      href="/produtos"
      className="mt-8 inline-block bg-lime px-8 py-4 font-bold"
    >
      Continuar comprando
    </Link>
  </div>
);
```

}

if (!items.length) {
return ( <div className="mx-auto max-w-xl px-4 py-24 text-center"> <h1 className="font-display text-5xl uppercase">
Seu carrinho está vazio </h1>

```
    <p className="mt-4 text-neutral-600">
      Escolha uma peça e ela aparece aqui.
    </p>

    <Link
      href="/produtos"
      className="mt-8 inline-block bg-lime px-8 py-4 font-bold"
    >
      Ver produtos
    </Link>
  </div>
);
```

}

return ( <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_380px]"> <div> <h1 className="font-display text-5xl uppercase">
Carrinho </h1>

```
    <ul className="mt-6 divide-y border-y">
      {items.map((i) => (
        <li
          key={i.id + i.size}
          className="flex gap-4 py-5"
        >
          <Link href={`/produtos/${i.slug}`}>
            <ProductImage
              src={i.image}
              alt={i.name}
              className="h-28 w-24 object-cover"
            />
          </Link>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between gap-2">
              <div>
                <p className="font-semibold">{i.name}</p>

                <p className="text-sm text-neutral-500">
                  Tamanho {i.size}
                </p>
              </div>

              <p className="font-bold">
                {brl(i.price * i.qty)}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="inline-flex items-center border border-neutral-300">
                <button
                  onClick={() =>
                    setQty(i.id, i.size, i.qty - 1)
                  }
                  aria-label="Diminuir"
                  className="h-9 w-9"
                >
                  −
                </button>

                <span className="w-8 text-center text-sm font-semibold">
                  {i.qty}
                </span>

                <button
                  onClick={() =>
                    setQty(i.id, i.size, i.qty + 1)
                  }
                  aria-label="Aumentar"
                  className="h-9 w-9"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => remove(i.id, i.size)}
                className="text-sm underline underline-offset-4 hover:text-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>

  <aside className="h-fit bg-neutral-50 p-6">
    <h2 className="font-display text-2xl uppercase">
      Seus dados
    </h2>

    <input
      type="text"
      placeholder="Seu nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mt-4 w-full border border-neutral-300 p-3"
    />

    <textarea
      placeholder="Endereço completo"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="mt-3 w-full border border-neutral-300 p-3"
      rows={3}
    />

    <h2 className="mt-6 font-display text-2xl uppercase">
      Resumo
    </h2>

    <dl className="mt-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{brl(subtotal)}</dd>
      </div>

      <div className="flex justify-between">
        <dt>Frete</dt>
        <dd>{shipping ? brl(shipping) : "Grátis"}</dd>
      </div>

      <div className="flex justify-between border-t pt-3 text-lg font-bold">
        <dt>Total</dt>
        <dd>{brl(subtotal + shipping)}</dd>
      </div>
    </dl>

    {shipping > 0 && (
      <p className="mt-3 text-xs text-neutral-500">
        Faltam {brl(FREE_SHIPPING - subtotal)} para frete grátis.
      </p>
    )}

    <button
      onClick={sendOrder}
      className="mt-6 w-full bg-lime py-4 font-bold transition hover:brightness-110"
    >
      Finalizar pelo WhatsApp
    </button>

    <Link
      href="/produtos"
      className="mt-3 block text-center text-sm underline underline-offset-4"
    >
      Continuar comprando
    </Link>
  </aside>
</div>
```

);
                  }
