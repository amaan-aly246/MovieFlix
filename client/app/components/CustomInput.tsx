import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
const CustomInput = ({
  name,
  control,
  placeholder,
  secureTextEntry = true,
}: //   rules = {},
CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      //   rules={rules}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <>
          <View className="flex-1 gap-5">
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#a8b5db"
              secureTextEntry={!secureTextEntry}
              autoComplete="off"
              textContentType="oneTimeCode"
              className="ml-2 text-white p-1 w-[200px] h-[30px]"
            />
            {error && (
              <Text
                style={{ color: "red", alignSelf: "stretch" }}
                className=" ml-3">
                {error.message || "Error"}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CustomInput;
