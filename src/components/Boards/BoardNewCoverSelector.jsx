import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { ImagePlus } from "lucide-react";
import { Input } from "../ui/input";

const BoardNewCoverSelector = ({
    modalOpen,
    unsplashImages,
    setUnsplashImages,
    setSelectedImageId,
    file,
    setFile,
}) => {
    const [boardImagesLoading, setBoardImagesLoading] = useState(false);
    const inputFileRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?page=1&query=vector+pattern&per_page=30&client_id=${
                    import.meta.env.VITE_UNSPLASH_ACCESS_KEY
                }`
            );
            const response = await res.json();
            const transformedData = response.results.map((info) => {
                return {
                    id: info.id,
                    image: {
                        regular: info.urls.small,
                        thumb: info.urls.thumb,
                    },
                    selected: false,
                };
            });
            setUnsplashImages(transformedData);
        };
        if (modalOpen && !unsplashImages.length) {
            setBoardImagesLoading(true);
            fetchImages();
            setBoardImagesLoading(false);
        }
    }, [modalOpen]);

    const handleSelectImage = (id) => {
        const updatedImages = unsplashImages.map((img) => {
            if (img.id === id) {
                return {
                    ...img,
                    selected: true,
                };
            } else {
                return {
                    ...img,
                    selected: false,
                };
            }
        });
        setSelectedImageId(id);
        setUnsplashImages(updatedImages);
    };

    const handleFileChange = (e) => {
        const inputFile = e.target.files[0];
        if (!inputFile && file) return;
        const fileId = Date.now();
        inputFile.id = fileId;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(inputFile);
        fileReader.onload = () => {
            const base64 = fileReader.result;
            setFile([...file, inputFile]);
            setUnsplashImages((prevState) => {
                return [
                    {
                        id: fileId,
                        selected: false,
                        image: {
                            thumb: base64,
                        },
                    },
                    ...prevState,
                ];
            });
        };
    };

    return (
        <>
            <div className="h-full relative flex justify-center items-center">
                <div
                    className="w-full h-full absolute inset-0 p-1"
                    type="fileInput"
                    id="fileInput"
                    onClick={() => inputFileRef.current.click()}
                >
                    <div className="w-full h-full border border-slate-600 border-dashed flex items-center cursor-pointer justify-center">
                        <ImagePlus
                            className="text-center text-slate-500"
                            size={25}
                        />
                    </div>
                </div>
                <Input
                    type="file"
                    ref={inputFileRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {!boardImagesLoading
                ? unsplashImages.map((img) => (
                      <div
                          className={cn(
                              "w-full",
                              img.selected &&
                                  "relative after:absolute after:inset-0 after:bg-black/70"
                          )}
                          key={img.id}
                      >
                          <img
                              className="w-full h-[55px] md:h-[70px] object-cover hover:opacity-75 cursor-pointer"
                              src={img.image.thumb}
                              alt="Board cover"
                              onClick={() => handleSelectImage(img.id)}
                          />
                          {img.selected && (
                              <Check
                                  size={25}
                                  className="text-white text-center absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 "
                              />
                          )}
                      </div>
                  ))
                : new Array(10).fill(0).map((item) => (
                      <div
                          className="grid grid-cols-5 w-full gap-2 h-full"
                          key={Math.random()}
                      >
                          <Skeleton className="w-full h-[70px]" />
                      </div>
                  ))}
        </>
    );
};

export default BoardNewCoverSelector;
