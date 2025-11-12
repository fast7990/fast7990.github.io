#!/usr/bin/env python3
"""
音频加密工具 - 使用AES-CBC模式加密MP3文件
"""
import os
import sys
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

def encrypt_file(input_path, output_path, key, iv):
    """
    使用AES-CBC模式加密文件
    
    Args:
        input_path: 输入文件路径
        output_path: 输出文件路径
        key: AES密钥 (32字节)
        iv: 初始化向量 (16字节)
    """
    # 创建AES加密器
    cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8'))
    
    # 读取输入文件
    with open(input_path, 'rb') as f:
        data = f.read()
    
    # 填充数据到16字节的倍数
    padded_data = pad(data, AES.block_size)
    
    # 加密数据
    encrypted_data = cipher.encrypt(padded_data)
    
    # 写入输出文件
    with open(output_path, 'wb') as f:
        f.write(encrypted_data)
    
    print(f"文件已加密: {output_path}")

def main():
    """主函数"""
    # 检查参数
    if len(sys.argv) != 2:
        print("用法: python encrypt_audio.py <input_file>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    if not os.path.exists(input_path):
        print(f"错误: 文件不存在: {input_path}")
        sys.exit(1)
    
    # 从player.js中使用相同的密钥和IV
    # 注意：AES-256需要32字节密钥，我们进行调整
    key = "ThisIsA32ByteKeyForAES256Encrypt"  # 正好32字节
    iv = "1234567890abcdef"  # 16字节
    
    # 创建输出文件路径
    base, ext = os.path.splitext(input_path)
    output_path = f"{base}_encrypted{ext}"
    
    encrypt_file(input_path, output_path, key, iv)

if __name__ == "__main__":
    main()
