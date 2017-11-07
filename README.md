# [@gik/tools-populator](http://gik.mx) *0.0.5*
> Allows you to populate an object in a single pass. Part of our [tools suite](https://github.com/gikmx/tools).

##### Contributors
- [Héctor Menéndez](mailto:hector@gik.mx) []()

##### Supported platforms
- darwin
- linux

#### <a name="table-of-contents"></a> Table of contents
- **[populator](#populator)** Allows properties in an object to inherit values from sibling properties.
- **[Types](#Types)** ``


# <a name="populator"></a> populator

Allows properties in an object to inherit values from sibling properties.
This specially useful when creating JSON configuration files.
> - [Standalone version](https://github.com/gikmx/tools-streamer).
> - [Report a Bug](https://github.com/gikmx/tools-streamer/issues).

###### Parameters
<table>
    <tr>
        <td style="white-space: nowrap;">
            <code>subject</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#Object">Object</a>
        </td>
        <td>The object you need to be populated.</td>
    </tr>
</table>


###### Returns
 [`Object`](#Object) <span style="font-weight:normal"> - An object copy with references replaced.</span>
###### Example 
```js
const subject = {
    a: { b: { c: 'world' } },
    d: "hello ${a.b.c}${e}",
    e: "!!!",
    f: ["${e}", "${a.b.c}"]
};
const result = Populator(subject);
// result:
// { a: { b: { c: 'world' } }, d: "hello world!!!", e: "!!!", f: ["!!!", "world"] };
```

<small>**[▲ Top](#table-of-contents)**</small>

---

# <a name="Types"></a> Types

###### Members

- [PupulatorParamError](#Types.PupulatorParamError)
- [PopulatorKeyError](#Types.PopulatorKeyError)

<small>**[▲ Top](#table-of-contents)**</small>

---

## <a name="Types.PupulatorParamError"></a> PupulatorParamError
> static  typedef of [`Types`](#Types)


The provided key cannot be used to populate the current property.



<small>**[▲ Top](#Types)**</small>

---

## <a name="Types.PopulatorKeyError"></a> PopulatorKeyError
> static  typedef of [`Types`](#Types)


The provided key cannot be used because is not a valid type.



<small>**[▲ Top](#Types)**</small>

---

