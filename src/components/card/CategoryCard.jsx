import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CategoryCard({
  image,
  categoryName,
  subCategoriesArr,
}) {
  return (
    <Card sx={{ width: "250px", height: "280px" }}>
     
      <CardMedia
        sx={{ height: 160 }}
        image={image}
        title="Category"
      />
      <CardContent sx={{ padding: "8px", height: "100px" }}>
       
        <Typography
          gutterBottom
          variant="h6" 
          component="div"
          sx={{ fontSize: "1rem", marginBottom: "2px" }} 
        >
          {categoryName}
        </Typography>
        <div>
          <ul style={{ marginBottom: "2px", paddingLeft: "20px" }}>
            {subCategoriesArr.map((subCategory, index) => (
              <li key={index}>{subCategory}</li> 
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
